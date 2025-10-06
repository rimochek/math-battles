// Email service using Resend API
// This is a template - you need to install resend package: npm install resend

export interface TeamRegistrationData {
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  captainName: string;
  language: 'ru' | 'kz' | 'en';
  league: 'junior' | 'senior';
}

export async function sendRegistrationConfirmation(data: TeamRegistrationData) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.log('RESEND_API_KEY not configured - skipping email');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    // You need to install resend: npm install resend
    // const { Resend } = await import('resend');
    // const resend = new Resend(RESEND_API_KEY);

    const translations = {
      ru: {
        subject: `Подтверждение регистрации команды ${data.teamName}`,
        greeting: `Уважаемый ${data.leaderName}!`,
        confirmation: `Ваша команда "${data.teamName}" успешно зарегистрирована на Алматинские Математические Бои 2025!`,
        details: `
Детали регистрации:
- Команда: ${data.teamName}
- Лига: ${data.league === 'junior' ? 'Юниоры (8-9 класс)' : 'Сениоры (10-12 класс)'}
- Капитан: ${data.captainName}
- Язык: ${data.language === 'ru' ? 'Русский' : data.language === 'kz' ? 'Казахский' : 'Английский'}
        `,
        footer: 'С наилучшими пожеланиями,\nКоманда Math Battles Community'
      },
      kz: {
        subject: `${data.teamName} командасының тіркелу растамасы`,
        greeting: `Құрметті ${data.leaderName}!`,
        confirmation: `Сіздің "${data.teamName}" командаңыз 2025 Алматы Математикалық шайқастарына сәтті тіркелді!`,
        details: `
Тіркелу мәліметтері:
- Команда: ${data.teamName}
- Лига: ${data.league === 'junior' ? 'Кіші лига (8-9 сынып)' : 'Жоғары лига (10-12 сынып)'}
- Капитан: ${data.captainName}
- Тіл: ${data.language === 'ru' ? 'Орысша' : data.language === 'kz' ? 'Қазақша' : 'Ағылшынша'}
        `,
        footer: 'Құрметпен,\nMath Battles Community командасы'
      },
      en: {
        subject: `Registration confirmation for team ${data.teamName}`,
        greeting: `Dear ${data.leaderName}!`,
        confirmation: `Your team "${data.teamName}" has been successfully registered for Almaty Math Battles 2025!`,
        details: `
Registration details:
- Team: ${data.teamName}
- League: ${data.league === 'junior' ? 'Junior (grades 8-9)' : 'Senior (grades 10-12)'}
- Captain: ${data.captainName}
- Language: ${data.language === 'ru' ? 'Russian' : data.language === 'kz' ? 'Kazakh' : 'English'}
        `,
        footer: 'Best regards,\nMath Battles Community Team'
      }
    };

    const t = translations[data.language];
    
    const emailContent = `${t.greeting}

${t.confirmation}

${t.details}

${t.footer}`;

    // Uncomment when resend is installed:
    /*
    const result = await resend.emails.send({
      from: 'Math Battles <noreply@battles.kz>',
      to: [data.leaderEmail],
      subject: t.subject,
      text: emailContent,
    });

    return { success: true, data: result };
    */

    // For now, just log the email content
    console.log('Registration confirmation email (would be sent):');
    console.log('To:', data.leaderEmail);
    console.log('Subject:', t.subject);
    console.log('Content:', emailContent);

    return { 
      success: true, 
      message: 'Email would be sent (Resend not installed yet)'
    };

  } catch (error) {
    console.error('Email sending failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}