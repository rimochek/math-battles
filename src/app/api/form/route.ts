import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { teams } from '@/db/schema';
import { teamSchema } from '@/components/register';
import { sendRegistrationConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the data using the team schema
    const validationResult = teamSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: 'Invalid form data', 
          errors: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if team name already exists
    try {
      const existingTeam = await db.query.teams.findFirst({
        where: (teams, { eq }) => eq(teams.team, data.teamName),
      });

      if (existingTeam) {
        return NextResponse.json(
          { message: 'Команда с таким названием уже существует' },
          { status: 400 }
        );
      }
    } catch (dbError) {
      console.error('Database query error:', dbError);
      return NextResponse.json(
        { message: 'Database connection error. Please check your DATABASE_URL configuration.' },
        { status: 500 }
      );
    }

    // Insert the new team
    try {
      const result = await db.insert(teams).values({
        team: data.teamName,
        league: data.league,
        language: data.language,
        leaderName: data.leaderName,
        leaderEmail: data.leaderEmail,
        leaderPhone: data.leaderPhone,
        captainName: data.captainName,
        captainSchool: data.captainSchool,
        captainGrade: data.captainGrade,
        captainEmail: data.captainEmail,
        captainPhone: data.captainPhone,
        member1Name: data.member1Name,
        member1School: data.member1School,
        member1Grade: data.member1Grade,
        member1Email: data.member1Email,
        member1Phone: data.member1Phone,
        member2Name: data.member2Name,
        member2School: data.member2School,
        member2Grade: data.member2Grade,
        member2Email: data.member2Email,
        member2Phone: data.member2Phone,
        member3Name: data.member3Name,
        member3School: data.member3School,
        member3Grade: data.member3Grade,
        member3Email: data.member3Email,
        member3Phone: data.member3Phone,
        member4Name: data.member4Name,
        member4School: data.member4School,
        member4Grade: data.member4Grade,
        member4Email: data.member4Email,
        member4Phone: data.member4Phone,
      }).returning();

      // Send confirmation email
      const emailResult = await sendRegistrationConfirmation({
        teamName: data.teamName,
        leaderName: data.leaderName,
        leaderEmail: data.leaderEmail,
        captainName: data.captainName,
        language: data.language,
        league: data.league,
      });

      console.log('Email result:', emailResult);
      
      return NextResponse.json(
        { 
          message: 'Team successfully registered!',
          teamId: result[0].id,
          emailSent: emailResult.success
        },
        { status: 200 }
      );

    } catch (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { message: 'Ошибка сохранения данных в базу. Попробуйте еще раз.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Registration API endpoint is active' },
    { status: 200 }
  );
}
