import { NextPageContext } from "next";
import dynamic from "next/dynamic";
const Planting = dynamic(() => import("../sections/Planting"));

type Props = {
    data: {
        plantName: string;
        personalizedPlantingGuides: string;
        seedSourcingAssistance: string;
        gardenPlanningConsultation: string;
    }
}

export default function Search({ data }: Props) {
    return <Planting plantName={data.plantName} gardenPlanningConsultation={data.gardenPlanningConsultation} personalizedPlantingGuides={data.personalizedPlantingGuides} seedSourcingAssistance={data.seedSourcingAssistance} />
}


export async function getServerSideProps(context: NextPageContext) {
    const { query } = context;
    const plant = query.plant || '';

    try {
        const res = await fetch("http://" + context.req?.headers.host + "/api/search?plant=" + plant);
        const data = await res.json();
        console.log(data);
        return {
            props: {
                data: data.response
            }
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                data: {}
            }
        }
    }
}