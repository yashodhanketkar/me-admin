import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from '#/components/ui/field'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from '#/components/ui/card'
import { ControllerWrapper } from '#/components/Controller'

const formName = 'form-user'

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log({ data: { ...data } })
  }

  return (
    <section className="page-wrap px-4 py-12">
      <Card className="island-shell rounded-2xl p-6 sm:p-8">
        <CardHeader className="">
          <CardTitle>Login Form</CardTitle>
          <CardDescription>Login form example</CardDescription>
        </CardHeader>
        <CardContent>
          <form id={formName} onSubmit={form.handleSubmit(onSubmit)}>
            <ControllerWrapper
              control={form.control}
              name="email"
              type="email"
              lable="Email"
              placeholder="Enter your email"
              autoComplete="on"
            />
            <ControllerWrapper
              control={form.control}
              name="password"
              type="password"
              lable="Password"
              placeholder="Enter your password"
              autoComplete="off"
            />
            <button type="submit">Submit</button>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form={formName}>
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </section>
  )
}

export default Page
