"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  service: z.enum([
    "caresmily-standard",
    "caresmily-premium",
    "caresmily-enterprise",
    "caresmily-home-care",
  ]),
  requestType: z.enum(["demo", "document", "other"]),
  inquiry: z.string().min(1, "お問い合わせ内容を入力してください"),
  companyName: z.string().min(1, "会社名を入力してください"),
  industry: z.string().min(1, "業種を入力してください"),
  name: z.string().min(1, "お名前を入力してください"),
  phone: z.string().min(1, "電話番号を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "個人情報の取り扱いについて同意してください",
  }),
});

import { Loading } from "@/components/ui/loading";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      privacyPolicy: false,
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);

    try {
      const requestId = localStorage.getItem("requestId") || uuidv4();
      localStorage.setItem("requestId", requestId);
      // API Routeを使用してメール送信
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          type: "contact",
          requestId,
        }),
      });

      if (!response.ok) {
        throw new Error("メール送信に失敗しました");
      }

      router.push(
        `/thanks?type=contact&email=${encodeURIComponent(values.email)}`,
      );
    } catch (error) {
      console.error("お問い合わせ処理エラー:", error);
      alert(
        "申し訳ありません。処理中にエラーが発生しました。しばらく経ってからもう一度お試しください。",
      );
    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {isLoading && <Loading />}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#35B6F7] to-[#35B6F7] py-16">
            <h1 className="text-4xl font-bold text-center text-white">
              お問い合わせ
            </h1>
          </div>
          <p className="text-xl text-center text-gray-600 mb-12">
            お気軽にご連絡ください。専門スタッフが丁寧に対応いたします。
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-primary">
                  お問い合わせ方法
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-medium">お電話</p>
                      <p className="text-lg font-bold">050-5497-5155</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-medium">メール</p>
                      <p className="text-lg">support@caresmily.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-medium">営業時間</p>
                      <p className="text-lg">平日 9:00〜18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold mb-4">
                  お問い合わせの前に
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    製品の詳しい機能や特徴について
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    導入までの流れや費用について
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    お客様に合わせて、ご提案いたします
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-primary">
                  お問い合わせフォーム
                </h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    {/* Service Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-700">
                        ご検討中のサービス
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
                                  <FormLabel className="font-normal">
                                    CareSmily デイサービス
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="caresmily-premium" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    CareSmily 介護記録
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="caresmily-enterprise" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    CareSmily 訪問介護
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="caresmily-home-care" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    CareSmily 居宅支援
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Request Type */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-700">
                        ご希望
                      </h3>
                      <FormField
                        control={form.control}
                        name="requestType"
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
                                    <RadioGroupItem value="demo" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    デモをご覧になりたい
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="document" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    資料をご覧になりたい
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="other" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    その他
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Inquiry Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-700">
                        ご相談内容
                      </h3>
                      <FormField
                        control={form.control}
                        name="inquiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="ご相談内容をご記入ください"
                                className="min-h-[100px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Company Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">
                          会社名
                        </h3>
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="株式会社CareSmily"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">
                          事業所名
                        </h3>
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="介護・福祉" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">
                          氏名
                        </h3>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="山田 太郎" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">
                          電話番号
                        </h3>
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="03-1234-5678"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-700">
                        メールアドレス
                      </h3>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="your-email@example.com"
                              />
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
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                <a
                                  href="/privacy-policy"
                                  className="text-primary hover:underline"
                                >
                                  個人情報の取り扱いについて
                                </a>
                                に同意する
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-dark transition-colors"
                    >
                      送信する
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
