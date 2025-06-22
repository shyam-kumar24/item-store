
import {db, serverTimestamp} from './firebase'
import {collection, addDoc, getDocs} from 'firebase/firestore'

export async function uploadItem(itemData){
    const docRef = await addDoc(collection(db,'items'),{
        ...itemData, 
        createdAt: serverTimestamp()
    })

    return docRef.id;
}


export async function fetchItems(){
    const snapShot = await getDocs(collection(db,'items'))
    return snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }))
}