"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, useFormContext, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@/utils/cn";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./atoms/form";
import { Input } from "./atoms/input";
import { Label } from "./atoms/label";
import { TabBar } from "@/components/atoms/tab-bar";
import { TooltipForm } from "./atoms/tooltip";
import { useTranslations } from "next-intl"


export const teamSchema = z.object({
    teamName: z
        .string()
        .regex(/[a-zA-z0-9]+/)
        .max(20),
    league: z.enum(["junior", "senior"]).default("junior"),
    language: z.enum(["ru", "kz", "en"]).default("ru"),
    leaderName: z.string(),
    leaderEmail: z.string().email(),
    leaderPhone: z.string(),
    captainName: z.string(),
    captainSchool: z.string(),
    captainGrade: z.coerce.number().min(8).max(12),
    captainEmail: z.string().email(),
    captainPhone: z.string(),
    member1Name: z.string(),
    member1School: z.string(),
    member1Grade: z.coerce.number().min(8).max(12),
    member1Email: z.string().email(),
    member1Phone: z.string(),
    member2Name: z.string(),
    member2School: z.string(),
    member2Grade: z.coerce.number().min(8).max(12),
    member2Email: z.string().email(),
    member2Phone: z.string(),
    member3Name: z.string().optional(),
    member3School: z.string().optional(),
    member3Grade: z.union([z.coerce.number().min(8).max(12), z.nan()]).optional(),
    member3Email: z.string().email().optional(),
    member3Phone: z.string().optional(),
    member4Name: z.string().optional(),
    member4School: z.string().optional(),
    member4Grade: z.union([z.coerce.number().min(8).max(12), z.nan()]).optional(),
    member4Email: z.string().email().optional(),
    member4Phone: z.string().optional(),
});

export type TeamSchema = z.infer<typeof teamSchema>;

export const RegisterForm = ({
    lang,
}: {
    lang: 'ru' | 'kz' | 'en';
}) => {
    const t = useTranslations('apply');
    const [hasAdditionalMember, setHasAdditionalMember] = useState(false)
    const [loading, setLoading] = useState(false)
    const [personalDataChecked, setPersonalDataChecked] = useState(false)
    
    const form = useForm<TeamSchema>({
        resolver: zodResolver(teamSchema),
        defaultValues: {
            league: "junior",
            language: lang,
        }
    });
    const registrationCloseDate = new Date("2025-10-19T23:59:00+05:00");
    
    const handleSubmit: SubmitHandler<TeamSchema> = async (data: TeamSchema) => {
        // reload the page if the registration is closed
        if (new Date() > registrationCloseDate) {
            location.reload()
        }
        setLoading(true)
        
        const res = await fetch("/api/form", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (res.ok) {
            toast.success(t("register.success"), { duration: 100000 })
        }
        else {
            const data = await res.json()
            form.setError("teamName", { message: data.message })
            toast.error(t("register.error", { message: data.message }), { duration: 100000 })

        }

        setLoading(false)
    };

    if (new Date() > registrationCloseDate) {
        return <div className="col-span-4 flex gap-4 flex-col">
            <div className="text-primary-500 font-bold text-6xl uppercase">{t("registrationClosed")}</div>
            <div className="text-primary-500 font-bold text-3xl uppercase">{t("seeYouSoon")}</div>
        </div>
    }

    return (

        <Form {...form}>
            <form
                className="flex flex-col gap-4 lg:col-span-6 col-span-4 lg:col-start-7 mb-6 md:px-5 md:py-2 md:mt-3 relative"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-1">{t("team.name")}</FormLabel>
                            <FormControl>
                                <Input
                                placeholder={t("team.name") + " " + t("team.nameHint")}
                                    maxLength={20}
                                    pattern="[a-zA-z0-9 ]+"
                                    className="md:h-16 h-14 md:p-5 border-neutral-300 rounded-lg lg:text-lg placeholder:text-neutral-400"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                <div className="flex flex-col lg:flex-row gap-5 flex-wrap">
                    <div className="flex flex-col gap-1 min-w-0">
                        <Label>{t("league.label")}</Label>
                        <TabBar

                            tabs={[
                                { label: `${t("league.junior")}, 8-9`, value: "junior" },
                                { label: `${t("league.senior")}, 10-12`, value: "senior" },
                            ]}
                            onChange={(value) =>
                                form.setValue("league", value as "junior" | "senior")
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-1 min-w-0">
                        <Label>{t("language.label")}</Label>
                        <TabBar
                            tabs={[
                                { label: t("language.ru"), value: "ru" },
                                { label: t("language.kz"), value: "kz" },
                                { label: t("language.en"), value: "en" },
                            ]}
                            onChange={(value) =>
                                form.setValue("language", value as "ru" | "kz" | "en")
                            }
                        />
                    </div>

                    <p className="text-sm font-medium text-destructive text-red-300">
                        {form.formState.errors.league?.message}
                    </p>
                    <p className="text-sm font-medium text-destructive text-red-300">
                        {form.formState.errors.language?.message}
                    </p>
                </div>

                <MemberForm prefix="leader" tooltip={t("leaderInfo")} />
                <MemberForm prefix="captain" tooltip={t("captainInfo")} />

                {
                    Array(4)
                        .fill(undefined)
                        .map((_, index) => (
                            <MemberForm key={`member${index + 1 as 1 | 2 | 3 | 4}`} prefix={`member${index + 1 as 1 | 2 | 3 | 4}`} className={`${index == 3 && !hasAdditionalMember && "hidden"}`} />
                        ))
                }
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={personalDataChecked}
                        onChange={(e) => setPersonalDataChecked(e.target.checked)}
                        className="w-4 h-4"
                    />
                    <Label className="ml-2">
                        {t.rich('personalData', {
                            a: (chunks) => <a href="#" className="underline" target="_blank">{chunks}</a>
                        })}
                    </Label>
                </div>
                <button
                    className={cn("border border-neutral-300 bg-white text-lg rounded-lg px-4 py-2 lg:grow-0 grow", hasAdditionalMember && "hidden")}
                    type="button"
                    onClick={() => setHasAdditionalMember(true)}
                >
                    {t("addMoreMembers")}
                </button>
                <div className="flex justify-end">
                    <button
                        className="bg-black text-white text-lg rounded-lg px-4 py-2 lg:grow-0 grow flex gap-1 items-center disabled:text-white/50"
                        type="submit"
                        disabled={!personalDataChecked || loading}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t("register.team")}
                    </button>
                </div>
            </form>

        </Form>
    );
};


interface MemberFormProps {
    prefix: `member${1 | 2 | 3 | 4}` | "captain" | "leader";
    className?: string;
    tooltip?: string;
}

const MemberForm = ({ prefix, className, tooltip }: MemberFormProps) => {
    const { control } = useFormContext<TeamSchema>()
    const t = useTranslations("apply"); 
    return (
        <div className={cn("flex flex-col gap-4 my-3", className)} >
            <FormField
                control={control}
                name={`${prefix}Name`}
                render={({ field }) => (
                    <FormItem>
                        <Label className="mb-1 flex gap-1">
                            {t(`${prefix}Name`)}
                            {tooltip && <TooltipForm content={tooltip} />}
                        </Label>
                        <FormControl>
                            <Input
                                placeholder={t(`${prefix}Name`) +
                                    " (ex: Константин Константинов Константинопольский)"}
                                className="md:h-16 h-14 md:p-5 border-neutral-300 rounded-lg lg:text-lg placeholder:text-neutral-400"

                                {...field}
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name={`${prefix}Email`}
                render={({ field }) => (
                    <FormItem>
                        <Label className="mb-1">
                            {t(`${prefix}Email`)}
                        </Label>
                        <FormControl>
                            <Input
                                placeholder={t(`${prefix}Email`)}
                                className="md:h-16 h-14 md:p-5 border-neutral-300 rounded-lg lg:text-lg placeholder:text-neutral-400"
                                {...field}
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name={`${prefix}Phone`}
                render={({ field }) => (
                    <FormItem>
                        <Label className="mb-1">
                            {t(`${prefix}Phone`)}
                        </Label>
                        <FormControl>
                            <Input
                                placeholder={t(`${prefix}Phone`) + " (ex: +77752146221)"}
                                className="md:h-16 h-14 md:p-5 border-neutral-300 rounded-lg lg:text-lg placeholder:text-neutral-400"
                                type="tel"
                                {...field}
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />


            {
                prefix !== "leader" && (
                    <>

                        <FormField
                            control={control}
                            name={`${prefix}Grade`}
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="mb-1">
                                        {t(`${prefix}Grade`)}
                                    </Label>
                                    <FormControl>
                                        <Input
                                            placeholder={t(`${prefix}Grade`)}
                                            className="md:h-16 h-14 md:p-5 border-neutral-300 rounded-lg lg:text-lg placeholder:text-neutral-400"
                                            {...field}
                                            type="number"
                                            min={8}
                                            max={12}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name={`${prefix}School`}
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="mb-1">
                                        {t(`${prefix}School`)}
                                    </Label>
                                    <FormControl>
                                        <Input
                                            placeholder={t(`${prefix}School`) + " (ex: НИШ ФМН г. Тараз)"}
                                            className="md:h-16 h-14 md:p-5 border-neutral-300 rounded-lg lg:text-lg placeholder:text-neutral-400"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </>
                )
            }
        </div>
    )
}
