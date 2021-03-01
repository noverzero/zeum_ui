import React from 'react'
import {Field, Form, Formik} from 'formik'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from "next/router"

interface loginProps {}


const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter()
    const [{}, login] = useLoginMutation()

    return (   
        <Wrapper variant="small">
            <Formik 
                initialValues={{username: "", password: ""} }
                onSubmit={async (values, {setErrors}) =>{
                    console.log(`look at these form values! ::>>`, values)
                    const response = await login({options: values})
                    if(response.data?.login.errors){
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user){
                        //we got a user! it worked!
                        router.push("/")
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>

                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            colorScheme="pink"
                            isLoading={isSubmitting}
                        >
                            register
                        </Button>
                    </Form>
                )}
        
            </Formik>
        </Wrapper> 
      
    )
}

export default Login