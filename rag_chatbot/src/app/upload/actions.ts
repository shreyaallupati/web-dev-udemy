// "use server";


// // @ts-ignore
// import pdf from "pdf-parse";
// import { db } from "@/lib/db-config";
// import { documents } from "@/lib/db-schema";
// import { generateEmbeddings } from "@/lib/embeddings";
// import { chunkContent } from "@/lib/chunking";

// export async function processPDF(formdata: FormData){
//     try{
//         const file = formdata.get("pdf") as File;

//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//         const data = await pdf(buffer);

//         if(!data.text || data.text.trim().length === 0){
//             return {
//                 success: false,
//                 error: "The uploaded PDF contains no extractable text."
//             }
//         }

//         const chunks = await chunkContent(data.text);
//         const embeddings = await generateEmbeddings(chunks);

//         const records = chunks.map((chunk, index) => ({
//             content : chunk,
//             embedding : embeddings[index],
//         }));

//         await db.insert(documents).values(records);
//         return {
//             success: true,
//             message: `${records.length} document chunks processed and stored.`
//         }
//     }catch(error){
//         console.error("Error processing PDF:", error);
//         return {
//             success: false,
//             error: "Failed to process PDF."
//         }
//     }

// }

"use server";

import { extractText } from "unpdf";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPDF(formdata: FormData) {
    try {
        const file = formdata.get("pdf") as File;
        if (!file) return { success: false, error: "No file uploaded." };

        const arrayBuffer = await file.arrayBuffer();
        // 2. Convert to Uint8Array instead of Buffer
        const uint8Array = new Uint8Array(arrayBuffer);

        // 3. Pass the Uint8Array to unpdf
        const result = await extractText(uint8Array);
        
        const text = Array.isArray(result.text) ? result.text.join("\n") : result.text;

        if (!text || text.trim().length === 0) {
            return { success: false, error: "The uploaded PDF contains no extractable text." };
        }

        // 1. Break text into smaller pieces
        const chunks = await chunkContent(text);
        
        // 2. Convert text chunks into vector numbers using Gemini
        const embeddings = await generateEmbeddings(chunks);

        // 3. Prepare for Neon/Postgres storage
        const records = chunks.map((chunk, index) => ({
            content: chunk,
            embedding: embeddings[index],
        }));

        // 4. Store in database
        if (records.length > 0) {
            await db.insert(documents).values(records);
        }

        return {
            success: true,
            message: `${records.length} document chunks processed and stored.`
        }
    } catch (error) {
        console.error("Error processing PDF:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to process PDF."
        }
    }
}

// "use server";

// // @ts-ignore
// import pdf from "pdf-parse";
// import { db } from "@/lib/db-config";
// import { documents } from "@/lib/db-schema";
// import { generateEmbeddings } from "@/lib/embeddings";
// import { chunkContent } from "@/lib/chunking";

// export async function processPDF(formdata: FormData) {
//     try {
//         const file = formdata.get("pdf") as File;

//         // 1. Guard Clause: Ensure file exists
//         if (!file || file.size === 0) {
//             return { success: false, error: "No file provided." };
//         }

//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//         const data = await pdf(buffer);

//         if (!data.text || data.text.trim().length === 0) {
//             return { success: false, error: "PDF contains no extractable text." };
//         }

//         // 2. Chunk & Embed
//         const chunks = await chunkContent(data.text);
        
//         // Ensure this function uses 'embedMany' internally for performance!
//         const embeddings = await generateEmbeddings(chunks);

//         const records = chunks.map((chunk, index) => ({
//             content: chunk,
//             embedding: embeddings[index],
//             // Pro-tip: Add metadata like filename for better UX later
//             metadata: { fileName: file.name, pageCount: data.numpages } 
//         }));

//         // 3. Batch Insert (Neon handles this very well)
//         await db.insert(documents).values(records);

//         return {
//             success: true,
//             message: `Successfully indexed ${records.length} sections from "${file.name}".`
//         };

//     } catch (error) {
//         console.error("RAG Indexing Error:", error);
//         return { success: false, error: "Failed to process document." };
//     }
// }