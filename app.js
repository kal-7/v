// =======================
// SUPABASE CONFIG
// =======================

const SUPABASE_URL = "https://mgydpxdsotopjgpbyjnr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1neWRweGRzb3RvcGpncGJ5am5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDk3OTMsImV4cCI6MjA5NDAyNTc5M30.PJGdPc2r8a2rDUkW1qwWd1lxWNaMnQYa6FYTv-4NmQ4";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// =======================
// GENERATE & UPLOAD
// =======================

async function generateWishCard(){

  const name = document.getElementById("name").value;
  const wish = document.getElementById("wish").value;
  const grow = document.getElementById("grow").value;
  const memory = document.getElementById("memory").value;

  // Fill postcard
  document.getElementById("cardName").innerText = name;
  document.getElementById("cardWish").innerText = wish;
  document.getElementById("cardGrow").innerText = grow;
  document.getElementById("cardMemory").innerText = memory;

  const postcard = document.getElementById("postcard");

  postcard.style.display = "block";

  // Create image
  const canvas = await html2canvas(postcard);

  postcard.style.display = "none";

  canvas.toBlob(async (blob) => {

    const fileName = `wish-${Date.now()}.png`;

    // Upload to Supabase
    const { data, error } = await supabaseClient
      .storage
      .from("wishes")
      .upload(fileName, blob);

    if(error){
      console.log(error);
      alert("❌ Upload failed");
      return;
    }

    // Public URL
    const imageUrl =
      `${SUPABASE_URL}/storage/v1/object/public/wishes/${fileName}`;

    console.log("Uploaded Image:", imageUrl);

    alert("🎉 Wish uploaded successfully!");

  }, "image/png");
}