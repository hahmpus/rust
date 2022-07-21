import React from 'react';
import { Routes, Route, NavLink } from "react-router-dom";

import { Button, Center, Divider, Image, Navbar as Nav, Text } from "@mantine/core";
import Recipies from './routes/Recipies';

export default function Navbar () {
  return <>
    <Nav 
      width={{ base: 300 }} 
      height={"100%"} 
      p="xs" 
      fixed 
      position={{ top: 0, left: 0 }}
      style={{color: "black"}}
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
      <Nav.Section>

        <NavLink to="/">
          <Button>
            Home
          </Button>
        </NavLink>

        <NavLink to="/recipies">
          <Button>
            Recipies
          </Button>
        </NavLink>
        
      </Nav.Section>
    </Nav>

  </>
}