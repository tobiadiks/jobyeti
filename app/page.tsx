'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,Card, CardHeader, CardBody, CardFooter, Divider, Image, Chip, Skeleton} from "@nextui-org/react";
import useSWR, { Fetcher } from "swr";
import moment from "moment";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function Home() {

  const fetcher =  (
    input: RequestInfo,
    init?: RequestInit
  ):any => {
    fetch(input, init={headers: {
      'X-RapidAPI-Key': '89c522e5b7msh0f9361c02303a67p1600e5jsncf9d95d3856d',
      'X-RapidAPI-Host': 'remote-jobs-api.p.rapidapi.com'
    }}).then(res => res.json())
    
  }
  const { data:latestJob, error:latestJobError, isLoading:latestJobLoading } = useSWR('https://remote-jobs-api.p.rapidapi.com/jobs', fetcher)
if(latestJobLoading){
  return(
    <Skeleton className="rounded-lg w-full h-full">
        <div className="h-full rounded-lg bg-default-300"></div>
      </Skeleton>
  )
}
  return (<>
    <Navbar isBordered>
      <div className="w-full text-center">
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">JOBYETI</p>
      </div>
     
    </Navbar>
    <div className="font-bold text-xl p-4">Latest Jobs</div>
    <div className="p-4 grid md:grid-cols-4 gap-4">
    {latestJob?.items?.map((job:any)=><Card key={job?._id} className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={job?.company_logo}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{job?.title}</p>
          <p className="text-small text-default-500 capitalize">{job?.company_name} @{job?.location} </p>
        </div>
      </CardHeader>
      {/* <Divider/>
      <CardBody className="flex flex-row space-x-4">
        <Chip variant="bordered">Fulltime</Chip>
        <Chip variant="bordered">Hybrid</Chip>
      </CardBody> */}
      <Divider/>
      <CardFooter>
       
    <div className="flex justify-between w-full">
      <div className="my-auto">{moment(job?.date).format("MMM Do YY")}</div>
      <Button>Details</Button>
    </div>
      </CardFooter>
    </Card>)}

    </div>
    </>
  );
}
