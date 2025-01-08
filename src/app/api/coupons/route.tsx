
export async function POST(req: Request) {
  const coupon = await req.json();
  const url = `${process.env.API_URL}/coupons/apply-coupon`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coupon),
  });

  const json = await res.json();

  return Response.json({...json, status: res.status});
}