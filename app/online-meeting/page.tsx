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
import { Loading } from "@/components/ui/loading"

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
          <div className="bg-gradient-to-r from-sky-300 to-cyan-400 py-16 relative overflow-hidden rounded-xl mb-8">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 relative">
              <div className="max-w-4xl mx-auto text-center text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  オンライン面談予約
                </h1>
                <p className="text-lg">
                  CareSmily の詳しい説明をオンラインでご案内いたします。
                  <br />
                  ご希望の日時をお選びください。
                </p>
              </div>
            </div>
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
                        <FormLabel>面談希望日</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ja })
                                ) : (
                                  <span>日付を選択してください</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
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