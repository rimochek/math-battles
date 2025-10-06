
import { useTranslations } from "next-intl"
import { RegisterForm } from "@/components/register";

interface RegistrationPageProps {
  params: {
    locale: "ru" | "kz"| "en"; // Используем ожидаемые локали
  }
}
export default function RegistrationPage({ params }: RegistrationPageProps) {
  const { locale } = params;
  const t = useTranslations("registration")

  return (
    <div>
      <div className="mx-auto max-w-4xl items-center justify-between p-6 lg:px-8 pt-12 pb-16">
        <p className="font-bold text-4xl mb-5">{t("registration")}</p>
        <p className="text-xl">{t("registrationContext")}</p>
      </div>
      <RegisterForm lang={locale} /> 
    </div>
    
  )
}
