// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ERROR_MSG } from "constants/msg";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const { account, password } = body || {};

    if (account === 'admin' && password === 'admin') {
      res.status(200).json({ name: account })
    } else {
      res.status(500).json({ error: ERROR_MSG.USERNAME_OR_PASSWORD_IS_INCORRECT })
    }
  } else {
    // Handle any other HTTP method
  }
}