export class PaymentsDto {
  money: number;
  type: string; // income(kirim) // expense(chiqim)
  title: string; // refill(Balansni to'ldirish)(Пополнение баланса) // purchase(Sotib olish)(Покупка)
  description: string; // Приобретение подписки через iTV v2.0: Pro (30 days) // <= subscriptions // Пополнение баланса через Apelsin // <= topup
  user: string; // ObjectId
}



// Shera toxtatamiz... bu dtoni olib to'liq mongodb collection 
// qilish kerak yani har bir to'lov qilingani collectionga ketadi 
// kim to'lov qilgani esa userId berib yuboriladi uyoqda filter 
// boladi bundan oldingi user.schema.ts ga esa payments uchun 
// osha collectionni ObjectId[] qilib beramkiz kerak b'lganda 
// populate qilib ochib olamiz.