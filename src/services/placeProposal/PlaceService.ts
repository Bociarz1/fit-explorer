import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import { DocumentData, collection, getFirestore } from "firebase/firestore";
import { Place } from "../place/placeInterface";

export async function getProposalPlaces(): Promise<Place[]> {
  try {
    const querySnapshot = await db.collection("proposalPlaces").get();
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

export async function getProposalPlaceById(
  id: string
): Promise<Place | void> {
  try {
    const docRef = await db.collection("proposalPlaces").doc(id).get();

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

export async function addProposalPlace(newProposalPlace: Place) {
  try {
    const docRef = await db.collection("proposalPlaces").add(newProposalPlace);
    return docRef;
  } catch (error) {
    console.log(error);
    return null;
  }
}
