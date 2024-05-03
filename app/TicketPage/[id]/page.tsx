import TicketForm from "@/app/(components)/TicketForm";
import React from "react";

function TicketPage({ params }: { params: { id: string } }) {
  return <TicketForm />;
}

export default TicketPage;
