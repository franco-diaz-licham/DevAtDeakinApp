import { storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/** Method which process files and saves to firebase storage. */
export async function uploadImage(file: File) {
    const timestamp = Date.now();
    const fileRename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const uniqueName = `${timestamp}_${fileRename}`;
    const imageRef = ref(storage, `images/${uniqueName}`);
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
}
