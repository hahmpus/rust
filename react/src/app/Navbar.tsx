import React from 'react';
import { Center, Divider, Image, Navbar as Nav, Text } from "@mantine/core";

export default function Navbar () {
  return <>
    <Nav 
      width={{ base: 300 }} 
      height={"100%"} 
      p="xs" 
      fixed 
      position={{ top: 0, left: 0 }}
      style={{color: "white"}}
    >
      <Nav.Section m={'xl'}>
        <Center>
          <Image 
            fit="contain"
            src="hk-logo.png"
            width={100}
            height={100}
            //alt="Mantine" 
            withPlaceholder
            placeholder={<Text align="center">logo</Text>}
          />
        </Center>
      </Nav.Section>
      <Divider />
      <Nav.Section>Recipies</Nav.Section>
    </Nav>
  </>
}