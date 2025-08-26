export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  console.log('API: Target program latihan accessed with ID:', id)
  
  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid program ID'
    })
  }
  
  // Return dummy target data
  return {
    id: parseInt(id),
    programId: parseInt(id),
    nama: `Target Program ID ${id}`,
    targetIndividu: [
      { id: 1, nama: "Peningkatan stamina", target: "30 menit lari", status: "pending" },
      { id: 2, nama: "Kekuatan otot", target: "50 push-up", status: "pending" }
    ],
    targetKelompok: [
      { id: 1, nama: "Kerjasama tim", target: "Latihan passing", status: "pending" },
      { id: 2, nama: "Strategi bermain", target: "Taktik pertahanan", status: "pending" }
    ],
    success: true
  }
})
