import React from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

interface PlantingProps {
    // Define the props for the Planting component here
    plantName: string;
    personalizedPlantingGuides: string;
    seedSourcingAssistance: string;
    gardenPlanningConsultation: string;
}

const Planting: React.FC<PlantingProps> = ({plantName,personalizedPlantingGuides,seedSourcingAssistance,gardenPlanningConsultation}) => {
    // Implement the component logic here

    // Replaces "\n" with "<br />" in the string
    
    personalizedPlantingGuides = personalizedPlantingGuides.replace(/\\n/g, "\n\n");
    seedSourcingAssistance = seedSourcingAssistance.replace(/\\n/g, "\n\n");
    gardenPlanningConsultation = gardenPlanningConsultation.replace(/\\n/g, "\n\n");

    return (
        <div className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-cover" src="/images/plant-1.jpg" alt="Product Image" />
                        </div>
                        
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-dark mb-2">{plantName}</h2>
                        <div className='mb-4'>
                            <span className="font-bold text-dark">Personalized Planting Guides:</span>
                                <Markdown remarkPlugins={[remarkGfm]} className={"mt-2"}>{personalizedPlantingGuides}</Markdown>
                        </div>
                        <div className='mb-4'>
                            <span className="font-bold text-dark">Seed Sourcing:</span>
                                <Markdown remarkPlugins={[remarkGfm]} className={"mt-2"}>{seedSourcingAssistance}</Markdown>
                        </div>
                        <div className='mb-4'>
                            <span className="font-bold text-dark">Garden Planning and Consultation:</span>
                                <Markdown remarkPlugins={[remarkGfm]} className={"mt-2"}>{gardenPlanningConsultation}</Markdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Planting;