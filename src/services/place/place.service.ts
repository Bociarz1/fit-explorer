import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import { DocumentData, collection, getFirestore } from "firebase/firestore";
import { Place } from "./placeInterface";

export async function getPlaces(): Promise<Place[]> {
  try {
    const querySnapshot = await db.collection("places").get();
    const data = querySnapshot.docs.map((doc) => {
      const item = doc.data() as Place;
      item.id = doc.id;
      return item;
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getPlaceById(
  id: string
): Promise<Place | void> {
  try {
    const docRef = await db.collection("places").doc(id).get();

    if (docRef.exists) {
      const data = docRef.data() as Place;
      return data;
    } else {
      console.log("No place found with the specified ID.");
    }
  } catch (error) {
    console.log(error);
   
  }
}

export async function addPlace(newPlace: Place) {
  try {
    const docRef = await db.collection("places").add(newPlace);
    return docRef;
  } catch (error) {
    console.log(error);
    return null;
  }
}
