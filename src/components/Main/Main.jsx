import React, { useEffect, useState } from 'react'
import { TopBar } from '../TopBar/TopBar'
import s from './Main.module.scss'
import { List } from './../List/List';
import { userSuperTypes, userTypes, licensesTypes, fileTypes, sceneTypes } from './listTypes';
import { BottomBar } from '../BottomBar/BottomBar';
import { CreateLicense } from '../Popup/CreateLicense';
import { DeleteLicense } from '../Popup/DeleteLicense';
import { ReturnLicense } from './../Popup/ReturnLicense';
import { CreateUser } from './../Popup/CreateUser';
import { Scene } from '../Scene/Scene';

export const Main = () => {
  const [categories, setCategories] = useState([])
  const [currentCat, setCurrentCat] = useState('Пользователи')
  const [listTypes, setListTypes] = useState([])
  const [userStatus, setUserStatus] = useState('manager')
  const [licenses, setLicenses] = useState(null)
  const [currentPopup, setCurrentPopup] = useState(null)
  const [scene, setScene] = useState(true)
  useEffect(() => {
    if(currentCat === 'Пользователи') {
      const currentUserList = userStatus === 'super' ? userSuperTypes : userTypes
      // const newList = currentUserList.map(item => {
      //   return {...item, sortType: 0, sorting: () => sortArray(item)}
      // })
      setListTypes(userStatus === 'super' ? userSuperTypes : userTypes)
      setLicenses(null)
    } else if(currentCat === 'Лицензии') {
      setListTypes(licensesTypes)
      setLicenses('active')
    } else if(currentCat === '3D Модели' || currentCat === 'Фото 360') {
      setListTypes(fileTypes)
    } else if(currentCat === 'Сцены') {
      setListTypes(sceneTypes)
    }
  }, [currentCat])
  return (
    <section className={s.main}>
      {currentPopup === 'createLicense' && <CreateLicense setCurrentPopup={setCurrentPopup} />}
      {currentPopup === 'deleteLicense' && <DeleteLicense setCurrentPopup={setCurrentPopup} />}
      {currentPopup === 'returnLicense' && <ReturnLicense setCurrentPopup={setCurrentPopup} />}
      {currentPopup === 'createUser' && <CreateUser setCurrentPopup={setCurrentPopup} />}
      <div className={s.container}>
        {scene ?? 
        <div>
          <TopBar setCurrentPopup={setCurrentPopup} setLicenses={setLicenses} licenses={licenses} userStatus={userStatus} categories={categories} setCategories={setCategories} currentCat={currentCat} setCurrentCat={setCurrentCat} />
          <List setCurrentPopup={setCurrentPopup} licenses={licenses} listTypes={listTypes} setListTypes={setListTypes} />
          <BottomBar />
        </div>}
        {scene && <Scene />}
      </div>
    </section>
  )
}
