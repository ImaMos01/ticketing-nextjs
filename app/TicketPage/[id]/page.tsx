import TicketForm from "@/app/(components)/TicketForm";
import React from "react";

interface Ticketdata {
  _id?: string;
  title: string;
  description: string;
  priority: number;
  progress: number;
  status: string;
  active: boolean;
  category: string;
}

const getTicketById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to get ticket.");
    }
    const ticketData = await res.json();
    return ticketData;
  } catch (error) {
    console.log(error);
  }
};
async function TicketPage({ params }: { params: { id: string } }) {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTicketData: any = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    const foundTicket = updateTicketData.foundTicket;
    return <TicketForm ticket={foundTicket} />;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <TicketForm ticket={updateTicketData} />;
}

export default TicketPage;
