import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AddStayFooter } from "../cmps/addStay.cmps/AddStayFooter";
import { AddStayHeader } from "../cmps/addStay.cmps/AddStayHeader";
import { AddStayStepOne } from "../cmps/addStay.cmps/AddStayStepOne ";
import { DescribesStay } from "../cmps/addStay.cmps/DescribesStay";
import { stayService } from "../services/stay.service";
import { LocatedStay } from "../cmps/addStay.cmps/LocatedStay";
import { BasicsAboutStay } from "../cmps/addStay.cmps/BasicsAboutStay";
import { HasInStay } from "../cmps/addStay.cmps/HasInStay";
import { AddImgStay } from "../cmps/addStay.cmps/AddImgStay";
import { DataStay } from "../cmps/addStay.cmps/DataStay";
import { PublishStay } from "../cmps/addStay.cmps/PublishStay";
import { addStays } from "../store/actions/stay.actions";

export function AddStay() {
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const [newStay, setNewStay] = useState(stayService.getEmptyStay(loggedinUser))
    const [step, setStep] = useState(1)
    const [isNext, setIsNext] = useState(true)
    const stepCount = 8
    const { name, type, imgUrls, price, summary, capacity, amenities, labels, host, loc } = newStay


    function onAddStay(){
        addStays(newStay)
        navigate("/stay")
    } 

    function setStay(key, val) {
        setNewStay(prev => ({ ...prev, [key]: val }))
    }

    function incStep(inc) {
        if (step === 1 && inc === -1) return
        setStep(step + inc)
    }


    return (
        <section className="add-stay main-container">
            <AddStayHeader />
            <main>
                {step === 1 && <AddStayStepOne />}
                {step === 2 && <DescribesStay type={type} setStay={setStay} setIsNext={setIsNext} />}
                {step === 3 && <LocatedStay loc={loc} setStay={setStay} setIsNext={setIsNext} />}
                {step === 4 && <BasicsAboutStay capacity={capacity} setStay={setStay} />}
                {step === 5 && <HasInStay amenities={amenities} setStay={setStay} />}
                {step === 6 && <AddImgStay imgUrls={imgUrls} setStay={setStay} setIsNext={setIsNext} />}
                {step === 7 && <DataStay name={name} summary={summary} price={price} setStay={setStay} setIsNext={setIsNext} />}
                {step === 8 && <PublishStay setIsNext={setIsNext} onAddStay={onAddStay} />}
            </main>
            <AddStayFooter incStep={incStep} step={step} stepCount={stepCount} isNext={isNext} />
        </section>
    )
}