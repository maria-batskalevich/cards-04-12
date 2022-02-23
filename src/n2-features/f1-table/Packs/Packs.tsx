import React, {ReactElement} from "react";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {DeleteCardsPackThunk, UpdateCardsPackThunk} from "./PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {initAppStateType} from "../../../n1-main/m2-bll/app-reducer";
import {LoadingProgress} from "../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress";
import {ModalContainer} from "../../../n3-modals/ModalContainer";
import {ModalInputContainer} from "../../../n3-modals/InputModal/ModalInputContainer";

type PacksPropsType = {
    cardsPacks?: CardPacksResponseType[]
    user_id: string | null | undefined
}
export const Packs = (props: PacksPropsType): ReactElement => {

    const dispatch = useDispatch()
    const {error, statusApp, entityStatus} = useSelector<AppRootStateType, initAppStateType>(state => state.app)

    return <div>
        {statusApp === 'loading' && <LoadingProgress/>}
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Cards count</th>
                <th>Last updated</th>
                <th>Created</th>
                <th>Rating</th>
            </tr>
            </thead>
            {error && <div>{error}</div>}
            <tbody>
            {props.cardsPacks && props.cardsPacks[0] && props.cardsPacks.map((c) => {

                const deletePackHandler = () => {
                    dispatch(DeleteCardsPackThunk(c._id))
                }
                const updatePackNameHandler = (newPackName: string) => {
                    dispatch(UpdateCardsPackThunk(c._id, newPackName))
                }

                return <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.cardsCount}</td>
                    <td>{c.updated}</td>
                    <td>{c.created}</td>
                    <td>{c.rating}</td>
                    <SuperButton disabled={entityStatus === 'loading'}>Learn</SuperButton>
                    {props.user_id === c.user_id &&
                    <>
                        <ModalContainer title={'Delete'}
                                        message={`Do you really want to remove Pack Name - ${c.name}?\n +
                                        '            All cards will be excluded from this course.`}
                                        callback={deletePackHandler}/>
                        <ModalInputContainer title={'Update'}
                                             message={'Update pack name'}
                                             callback={updatePackNameHandler}/>
                    </>}
                </tr>
            })}
            </tbody>
        </table>
    </div>
}