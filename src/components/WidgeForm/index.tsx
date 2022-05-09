import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../Figmoji/bug.svg';
import ideaImageUrl from '../../Figmoji/idea.svg';
import thoughtImageUrl from '../../Figmoji/thought.svg';
import { useState } from "react";
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./steps/FeedbackSuccessStep";


export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImageUrl,
            alt: 'imagem de um inseto'
        },
    },
    IDEIA: {
        title: "Idéia",
        image: {
            source: ideaImageUrl,
            alt: 'imagem de uma lampada'
        },
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImageUrl,
            alt: 'imagem de uma nuvem'
        },
    },
};


export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm () {
    const [ feedbackType, setFeedbackType ] = useState<FeedbackType  | null >(null)
    const [ feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vh-2rem)] md:w-auto">
            {  feedbackSent ? (
                <FeedbackSuccessStep onfeedbackrestartrequest={handleRestartFeedback} />

            ) : (
                <>
                    {! feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged = {setFeedbackType} />
            ) : ( 
                <FeedbackContentStep 
                feedbackType = { feedbackType } 
                onFeedbackRestarted = {handleRestartFeedback}
                onfeedbackSent = {() => setFeedbackSent(true)}
                />
            )}
                </>
            ) }
            
            <footer className="text-xs text-neutral-400">
                <p> Feito com 💜 pela <a className="underline underline-offset-2" href="https//rocketseat.com.br">RocketSeat</a> </p>
            </footer>
        </div>

    );
}