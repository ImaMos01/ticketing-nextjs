import TicketCard from "./(components)/TicketCard";

interface TicketData {
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: string;
  active: boolean;
}

const getTickets = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("failed to get tickets", error);
  }
};

export default async function Home() {
  const { tickets }: { tickets: TicketData[] } = await getTickets();

  //remove the duplicate results
  const uniqueCategories: string[] = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, index) => (
            <div key={index} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter(
                    (ticket: TicketData) => ticket.category === uniqueCategory
                  )
                  .map((tFiltered: TicketData, _index) => (
                    <div key={_index}>
                      <TicketCard ticket={tFiltered} id={_index} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
