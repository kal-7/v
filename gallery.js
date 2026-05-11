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
// LOAD GALLERY
// =======================

async function loadGallery(){

  const galleryGrid =
    document.getElementById("galleryGrid");

  const { data, error } = await supabaseClient
    .storage
    .from("wishes")
    .list("", {
      limit: 100,
      sortBy: {
        column: "created_at",
        order: "desc"
      }
    });

  if(error){
    console.log(error);
    return;
  }

  data.forEach(file => {

    const imageUrl =
      `${SUPABASE_URL}/storage/v1/object/public/wishes/${file.name}`;

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${imageUrl}" />

      <a
        href="${imageUrl}"
        download
        target="_blank"
        class="download-btn"
      >
        ⬇ Download Wish
      </a>
    `;

    galleryGrid.appendChild(card);

  });

}

loadGallery();