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
import { addStay, removeStay, updateStay } from "../store/actions/stay.actions";
import { useLocation, useNavigate } from "react-router-dom";
import { StayType } from "../cmps/addStay.cmps/StayType";

export function AddStay() {
    const location = useLocation();
    const navigate = useNavigate();

    const stayId = new URLSearchParams(location.search).get('stayId');
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const [newStay, setNewStay] = useState(stayService.getEmptyStay(loggedinUser))
    const [step, setStep] = useState(1)
    const [isNext, setIsNext] = useState(true)
    const stepCount = 9
    const { name, type, labels, imgUrls, price, summary, capacity, amenities, loc } = newStay

    useEffect(() => {
        if (stayId) {
            getStay(stayId)
        }
    }, [location.search]);

    async function getStay(stayId) {
        try {
            const stay = await stayService.get(stayId)
            if (!stay || stay.host._id != loggedinUser._id) return navigate("/stay")
            setNewStay(stay)
        } catch (error) {
            console.log("Had issues loading stay", error);
        }
    }

    function onDelete() {
        removeStay(stayId)
        navigate("/stay")
    }

    function onAddStay() {
        stayId ? updateStay(newStay) : addStay(newStay)
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
                {step === 1 && <AddStayStepOne isExistsStay={!!stayId} onDelete={onDelete} />}
                {step === 2 && <StayType type={type} setStay={setStay} setIsNext={setIsNext} />}
                {step === 3 && <DescribesStay labels={labels} setStay={setStay} setIsNext={setIsNext} />}
                {step === 4 && <LocatedStay loc={loc} setStay={setStay} setIsNext={setIsNext} />}
                {step === 5 && <BasicsAboutStay capacity={capacity} setStay={setStay} />}
                {step === 6 && <HasInStay amenities={amenities} setStay={setStay} setIsNext={setIsNext} />}
                {step === 7 && <AddImgStay imgUrls={imgUrls} setStay={setStay} setIsNext={setIsNext} />}
                {step === 8 && <DataStay name={name} summary={summary} price={price} setStay={setStay} setIsNext={setIsNext} />}
                {step === 9 && <PublishStay setIsNext={setIsNext} onAddStay={onAddStay} isExistsStay={!!stayId} />}
            </main>
            <AddStayFooter incStep={incStep} step={step} stepCount={stepCount} isNext={isNext} />
        </section>
    )
}