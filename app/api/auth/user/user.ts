import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function user() {
    const {getUser} = getKindeServerSession();
    const user = await getUser()
  return user
}
