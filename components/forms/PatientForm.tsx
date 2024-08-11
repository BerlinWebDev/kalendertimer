"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,

} from "@/components/ui/form"
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {UserFormValidation} from "@/lib/validation";
import {useRouter} from "next/navigation";
import {createUser} from "@/lib/actions/patient.actions";
import {users} from "@/lib/appwrite.config";

import "react-phone-number-input/style.css";
export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    PHONE_INPUT = 'phoneInput',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}



const PatientForm = ()  => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);
        try {
            const userData = { name, email, phone };
            const user = await createUser(userData);

            if (user) router.push(`/patients/${user.$id}/register`)


        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6 ">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi There!</h1>
                    <p className="text-dark-700">Schedule your first appointment</p>
                </section>
                <CustomFormField fieldType={FormFieldType.INPUT} name="name" label="Vor- und Nachname" placeholder="Max Mustermann" iconSrc="/assets/icons/user.svg" iconAlt="user" control={form.control} />
                <CustomFormField fieldType={FormFieldType.INPUT} name="email" label="Email" placeholder="Max@Mustermann.de" iconSrc="/assets/icons/email.svg" iconAlt="email" control={form.control} />
                <CustomFormField fieldType={FormFieldType.PHONE_INPUT} name="phone" label="Telefonnumer" placeholder="030 1234567" control={form.control} />

                <SubmitButton isLoading={isLoading}>Los Gehts!</SubmitButton>
            </form>
        </Form>
    );

}

export default PatientForm;