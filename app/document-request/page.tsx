"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Mail, Phone } from "lucide-react"
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z.string().min(1, "電話番号を入力してください"),
  companyName: z.string().min(1, "会社名を入力してください"),
  position: z.string().optional(),
  service: z.enum(["caresmily-standard", "caresmily-premium", "caresmily-enterprise", "caresmily-home-care"]),
  documentType: z.enum(["product-overview", "case-studies", "price", "all"]),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "個人情報の取り扱いについて同意してください",
  }),
})

import { Loading } from "@/components/ui/loading"

export default function DocumentRequestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      privacyPolicy: false,
      documentType: "all",
    },
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
            type: 'document',
            requestId
          }),
        });

        router.push(`/thanks?type=document&email=${encodeURIComponent(values.email)}`);

      } catch (error) {
        console.error("資料請求処理エラー:", error);
        alert("申し訳ありません。処理中にエラーが発生しました。しばらく経ってからもう一度お試しください。");
      }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {isLoading && <Loading />}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-300 to-cyan-400 py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 relative">
              <div className="max-w-4xl mx-auto text-center text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  資料請求
                </h1>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-b-xl shadow-lg p-8 mb-12">
            <p className="text-xl text-center text-gray-600 mb-8">
              CareSmily の詳しい資料をご希望の方は、以下のフォームよりお申し込みください。
              <br />
              ご入力いただいたメールアドレスに、資料をお送りいたします。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">製品概要</h3>
                <p className="text-sm text-gray-600">CareSmily の基本機能や特徴について詳しく解説した資料です。</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">導入事例集</h3>
                <p className="text-sm text-gray-600">実際に CareSmily を導入された事業所様の事例をまとめた資料です。</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">料金プラン</h3>
                <p className="text-sm text-gray-600">各サービスの詳細な料金プランを記載した資料です。</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          お名前 <span className="text-red-500">*</span>
                        </FormLabel>
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
                        <FormLabel>
                          メールアドレス <span className="text-red-500">*</span>
                        </FormLabel>
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
                        <FormLabel>
                          電話番号 <span className="text-red-500">*</span>
                        </FormLabel>
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
                        <FormLabel>
                          会社名 <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="株式会社〇〇" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>役職</FormLabel>
                      <FormControl>
                        <Input placeholder="部長・課長・担当者など" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Service Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    ご検討中のサービス <span className="text-red-500">*</span>
                  </h3>
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="caresmily-standard" />
                              </FormControl>
                              <FormLabel className="font-normal">CareSmily デイサービス</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="caresmily-premium" />
                              </FormControl>
                              <FormLabel className="font-normal">CareSmily 介護記録</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="caresmily-enterprise" />
                              </FormControl>
                              <FormLabel className="font-normal">CareSmily 訪問介護</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="caresmily-home-care" />
                              </FormControl>
                              <FormLabel className="font-normal">CareSmily 居宅支援</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Document Type */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    ご希望の資料 <span className="text-red-500">*</span>
                  </h3>
                  <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="product-overview" />
                              </FormControl>
                              <FormLabel className="font-normal">製品概要</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="case-studies" />
                              </FormControl>
                              <FormLabel className="font-normal">導入事例集</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="price" />
                              </FormControl>
                              <FormLabel className="font-normal">料金プラン</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="all" />
                              </FormControl>
                              <FormLabel className="font-normal">すべての資料</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Privacy Policy */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="privacyPolicy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            <a href="/privacy-policy" className="text-primary hover:underline">
                              個人情報の取り扱いについて
                            </a>
                            に同意する <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 transition-colors">
                  資料を請求する
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-primary">お電話でのお問い合わせ</h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Phone className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="font-medium">お電話</p>
                  <p className="text-2xl font-bold">050-5497-5155</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="font-medium">メール</p>
                  <p className="text-lg">support@caresmily.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}