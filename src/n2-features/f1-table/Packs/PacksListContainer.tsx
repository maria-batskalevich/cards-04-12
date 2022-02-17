import {ReactElement, useEffect, useState} from "react";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {AddCardsPackThunk, FetchPacksThunk, SetPrivatePacksThunk} from "./PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {AddItem} from "../../../n1-main/m1-ui/common/AddItemForm/AddItem";
import {PacksList} from "./PacksList";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Navigate} from "react-router-dom";

export const PacksListContainer = (): ReactElement => {

    const dispatch = useDispatch()

    const cardsPacks = useSelector<AppRootStateType, CardPacksResponseType[]>(state => state.packs.cardPacks)
    const user_id = useSelector<AppRootStateType, string | null | undefined>(state => state.profile._id)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const [addPack, setAddPack] = useState<boolean>(false)

    useEffect(() => {
        if(!isLoggedIn) return
        dispatch(FetchPacksThunk())
    }, [dispatch])

    const showMyCardsPacks = () => dispatch(SetPrivatePacksThunk(user_id))
    const showAllCardsPacks = () => dispatch(FetchPacksThunk())
    if (!isLoggedIn) {
        return  <Navigate to={'/login'}/>
    }
    return (
        <div>
            <div>
                <div>
                    <span>Show packs cards</span>
                    <SuperButton onClick={showMyCardsPacks}>My</SuperButton>
                    <SuperButton onClick={showAllCardsPacks}>ALL</SuperButton>
                </div>
                <div>
                    <span>Number of cards</span>
                    <input type={'range'}/>
                </div>
            </div>
            <div>
                {addPack
                    ? <AddItem itemTitle={'Add new pack'} addItem={addPack} setAddItem={setAddPack} callback={AddCardsPackThunk}/>
                    : <PacksList addPack={addPack} setAddPack={setAddPack} cardsPacks={cardsPacks} user_id={user_id}/>}
            </div>
        </div>
    );
};
