export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  console.log('API: Program latihan accessed with ID:', id)
  
  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid program ID'
    })
  }
  
  // Return dummy data
  return {
    id: parseInt(id),
    nama: `Program Latihan ID ${id}`,
    cabor: "Sepak Bola",
    kategori: "Putra",
    periode: "2025-08-01 s/d 2025-08-31",
    keterangan: "Program latihan untuk pengembangan fisik dan teknik.",
    success: true
  }
})
