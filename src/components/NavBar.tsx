import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link"
import { useMeQuery } from '../generated/graphql';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{data, fetching}] =  useMeQuery()
        let body = null 

        
        if (fetching){//data is loading
            body = null
        } else if (!data?.me) {// user not logged in
            body = (
                <>
                    <NextLink href="/login">
                        <Link color='white' mr={2}> Sign In today!</Link>
                    </NextLink>
                    <NextLink href="/register">
                        <Link color='white' mr={2}> register</Link>
                    </NextLink>
                </>
            )
        } else {// user logged in
            body = (
            <Box>
                <Flex>
                    <Box mr={2}> {data.me.username}</Box>
                    <Button variant="link ">sign out</Button>
                </Flex>
            </Box>
            )

        }
        return (
            <Flex bg='tan' p={4} > 
                {

                }
                <Box ml={'auto'}>
                    { body }
                </Box>

            </Flex>
        );
}