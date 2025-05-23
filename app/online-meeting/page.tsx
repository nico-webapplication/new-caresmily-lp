"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z.string().min(1, "電話番号を入力してください"),
  companyName: z.string().min(1, "会社名を入力してください"),
  date: z.date({
    required_error: "面談希望日を選択してください",
  }),
  timeSlot: z.enum(["10:00", "11:00", "13:00", "14:00", "15:00", "16:00"], {
    required_error: "面談希望時間を選択してください",
  }),
  message: z.string().optional(),
})

import { Loading } from "@/components/ui/loading"

export default function OnlineMeeting() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(values)

    try {
      const requestId = localStorage.getItem('requestId') || uuidv4();
      localStorage.setItem('requestId', requestId);
      // API Routeを使用してメール送信
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          type: 'online-meeting',
          requestId
        }),
      });

      if (!response.ok) {
        throw new Error('メール送信に失敗しました');
      }

      // thanksページへリダイレクト
      router.push(`/thanks?type=online-meeting&email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      console.error("お問い合わせ処理エラー:", error);
      alert("申し訳ありません。処理中にエラーが発生しました。しばらく経ってからもう一度お試しください。");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {isLoading && <Loading />}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">オンライン面談予約</h1>
            <p className="text-lg text-gray-600">
              CareSmily の詳しい説明をオンラインでご案内いたします。
              <br />
              ご希望の日時をお選びください。
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>お名前</FormLabel>
                        <FormControl>
                          <Input placeholder="山田 太郎" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メールアドレス</FormLabel>
                        <FormControl>
                          <Input placeholder="your-email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>電話番号</FormLabel>
                        <FormControl>
                          <Input placeholder="03-1234-5678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>会社名</FormLabel>
                        <FormControl>
                          <Input placeholder="株式会社〇〇" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-gray-700 font-medium">面談希望日</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start pl-3 text-left font-normal h-10 border-gray-300 hover:border-blue-400 transition-colors",
                                  !field.value && "text-gray-500",
                                  field.value && "text-gray-900"
                                )}
                              >
                                {field.value ? (
                                  <span className="flex items-center">
                                    <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                                    {format(field.value, "yyyy年M月d日(E)", { locale: ja })}
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                                    日付を選択してください
                                  </span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 shadow-lg border-gray-200" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today || date.getDay() === 0 || date.getDay() === 6;
                              }}
                              initialFocus
                              className="rounded-md border-0"
                              classNames={{
                                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                month: "space-y-4",
                                caption: "flex justify-center pt-1 relative items-center mb-4",
                                caption_label: "text-sm font-semibold text-gray-900",
                                nav: "space-x-1 flex items-center",
                                nav_button: cn(
                                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-blue-50 rounded-md transition-all"
                                ),
                                nav_button_previous: "absolute left-1",
                                nav_button_next: "absolute right-1",
                                table: "w-full border-collapse space-y-1",
                                head_row: "flex",
                                head_cell: "text-gray-500 rounded-md w-9 font-medium text-[0.8rem] text-center",
                                row: "flex w-full mt-2",
                                cell: "h-9 w-9 text-center text-sm p-0 relative hover:bg-blue-50 rounded-md transition-colors focus-within:relative focus-within:z-20",
                                day: cn(
                                  "h-9 w-9 p-0 font-normal rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all"
                                ),
                                day_selected: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
                                day_today: "bg-blue-100 text-blue-600 font-semibold",
                                day_outside: "text-gray-400 opacity-50",
                                day_disabled: "text-gray-300 opacity-30 cursor-not-allowed hover:bg-transparent",
                                day_range_middle: "aria-selected:bg-blue-50 aria-selected:text-blue-600",
                                day_hidden: "invisible",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                        <p className="text-xs text-gray-500 mt-1">※ 平日のみ選択可能です</p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeSlot"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>面談希望時間</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-3 gap-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="10:00" />
                              </FormControl>
                              <FormLabel className="font-normal">10:00</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="11:00" />
                              </FormControl>
                              <FormLabel className="font-normal">11:00</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="13:00" />
                              </FormControl>
                              <FormLabel className="font-normal">13:00</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="14:00" />
                              </FormControl>
                              <FormLabel className="font-normal">14:00</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="15:00" />
                              </FormControl>
                              <FormLabel className="font-normal">15:00</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="16:00" />
                              </FormControl>
                              <FormLabel className="font-normal">16:00</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ご要望・ご質問など</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="ご要望やご質問がございましたらご記入ください"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90">
                  予約を確定する
                </Button>
              </form>
            </Form>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>※ 土日祝日を除く平日のみ予約可能です</p>
            <p>※ ご予約確定後、詳細な案内メールをお送りいたします</p>
          </div>
        </div>
      </div>
    </div>
  )
}