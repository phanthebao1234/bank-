'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils'
import {
    Form,
} from "@/components/ui/form"
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from "@/components/PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const formSchema = authFormSchema(type)
    // const loggedInUser = await getLoggedInUser();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        
        try {
            if(type === 'sign-up') {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password
                  }
        
                  const newUser = await signUp(userData);
        
                  setUser(newUser);
                
                
            } else if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                }) 
                if (response) router.push('/')
            }
        } catch(error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className="flex mb-12 cursor-pointer items-center gap-2">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Horizon logo"
                        className="size-[24px] max-xl:size-14"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg-text-36 font-semibold text-gray-900">
                        {user
                            ? 'Link account'
                            : type === 'sign-in'
                                ? 'Sign In'
                                : 'Sign Up'
                        }
                    </h1>
                    <p className="text-16 font-normal text-gray-600">
                        {user
                            ? 'Link your account to get started'
                            : 'Please enter your details'
                        }
                    </p>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    <PlaidLink user={user} variant="primary" />
                </div>
             ) : ( 
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                <div className="flex gap-4">
                                    <CustomInput
                                    control={form.control}
                                    name='firstName'
                                    label='First Name'
                                    placeholder='ex: The'
                                />
                                <CustomInput
                                    control={form.control}
                                    name='lastName'
                                    label='Last Name'
                                    placeholder='ex: Bao'
                                />
                                    
                                </div>
                                <CustomInput
                                    control={form.control}
                                    name='address1'
                                    label='Address'
                                    placeholder='ex: Ben Tre'
                                />
                                <CustomInput
                                    control={form.control}
                                    name='city'
                                    label='City'
                                    placeholder='ex: Ben Tre city'
                                />
                                <div className="flex gap-4">
                                    <CustomInput
                                        control={form.control}
                                        name='state'
                                        label='State'
                                        placeholder='ex: Ben Tre'
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name='postalCode'
                                        label='Postal Code'
                                        placeholder='ex: 86000'
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <CustomInput
                                        control={form.control}
                                        name='dateOfBirth'
                                        label='Date of Birth'
                                        placeholder='ex: dd-mm-yyyy'
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name='ssn'
                                        label='SSN'
                                        placeholder='ex: 1234'
                                    />
                                </div>
                                </>
                            )}

                            <CustomInput
                                control={form.control}
                                name='email'
                                label='Email'
                                placeholder='Enter your email address'

                            />

                            <CustomInput
                                control={form.control}
                                name='password'
                                label='Password'
                                placeholder='Enter your password'
                            />

                           <div className="flex flex-col gap-4">
                                <Button type="submit" className='form-btn w-full' disabled={isLoading}>
                                        {isLoading ? (<>
                                            <Loader2 size={20}  className='animate-spin'/> &nbsp; Loading...
                                        </>
                                        ) : type ==='sign-in' ?  'Sign In' : 'Sign Up'
                                        }
                                    </Button>
                           </div>
                            <footer className="flex justify-center">
                               {/* <p> { type === 'sign-in' ? 'Dont have an account?' : 'Already have an account' } </p> */}
                                {type === 'sign-in' ?  <><p className="text-14 font-normal text-gray-600">Dont have an account?</p><Link className="form-link" href={'/sign-up'}>&nbsp;Sign Up</Link></> : <><p className="text-14 font-normal text-gray-600">Already have an account ?</p><Link className="form-link" href={'/sign-in'}>&nbsp;Sign In</Link></>}
                            </footer>
                        </form>
                    </Form>
                </div>
            )}
        </section>
    )
}

export default AuthForm