import { createSlice } from "@reduxjs/toolkit"
import { BigNumber } from "ethers"
import DISTRIBUTOR_ABI from "./contract-abis/merkle-distributor"
// import balances from "../constants/balances"
import BalanceTree from "../lib/balance-tree"
import { createBackgroundAsyncThunk } from "./utils"
// import { getContract } from "./utils/contract-utils"
import * as DAOs from "../static/DAOs.json"
import * as delegates from "../static/delegates.json"
import * as eligibles from "../static/eligibles.json"

// const newBalanceTree = new BalanceTree(balances)

function jsonToArray(json: any) {
  return Object.keys(json)
    .map((key: string) => {
      return json[key]
    })
    .slice(0, -2)
}

export interface DAO {
  address: string
  name: string
  avatar: string
}

export interface Delegate {
  address: string
  ensName: string
  applicationLink: string
  avatar?: string
}

interface ClaimingState {
  status: string
  claimed: {
    [address: string]: boolean
  }
  distributor: any
  delegates: Delegate[]
  eligibles: {
    address: string
    earnings: string
    reasons: string
  }[]
  DAOs: DAO[]
  selectedDAO: DAO | null
  selectedDelegate: Delegate | null
}

// const findIndexAndBalance = (address: string) => {
//   // const index = balances.findIndex((el) => address === el.account)
//   // const balance = balances[index].amount
//   return { index, balance }
// }

const getDistributorContract = async () => {
  // const contractAddress = "0x1234"
  // const distributor = await getContract(contractAddress, DISTRIBUTOR_ABI)
  // return distributor
}

const getProof = (
  index: number | BigNumber,
  account: string,
  amount: BigNumber
) => {
  // newBalanceTree.getProof(index, account, amount)
}

const claim = createBackgroundAsyncThunk(
  "claim/distributorClaim",
  async (
    {
      account,
      referralCode,
    }: {
      account: string
      referralCode?: string
    },
    { getState }
  ) => {
    // const state: any = getState()
    // if (state.claimed[account]) {
    //   throw new Error("already claimed")
    // }
    // const { index, balance } = await findIndexAndBalance(account)
    // const proof = getProof(index, account, balance)
    // const distributor = await getDistributorContract()
    // if (!referralCode) {
    //   const tx = await distributor.claim(index, account, balance, proof)
    //   const receipt = await tx.wait()
    //   return receipt
    // }
    // const tx = await distributor.claimWithCommunityCode(
    //   index,
    //   account,
    //   balance,
    //   proof,
    //   referralCode
    // )
    // const receipt = await tx.wait()
    // return receipt
  }
)

const initialState = {
  status: "idle",
  claimed: {},
  distributor: {},
  selectedDAO: null,
  selectedDelegate: null,
  delegates: jsonToArray(delegates),
  DAOs: jsonToArray(DAOs),
  eligibles: jsonToArray(eligibles),
} as ClaimingState

const claimingSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {
    selectDAO: (immerState, { payload: DAO }) => {
      immerState.selectedDAO = DAO
    },
    selectDelegate: (immerState, { payload: delegate }) => {
      immerState.selectedDelegate = delegate
    },
  },
  extraReducers: (builder) => {
    builder.addCase(claim.pending, (immerState) => {
      immerState.status = "loading"
    })
    builder.addCase(claim.fulfilled, (immerState, { payload }) => {
      const address: any = { payload }
      immerState.status = "success"
      immerState.claimed[address] = true
    })
    builder.addCase(claim.rejected, (immerState) => {
      immerState.status = "rejected"
    })
  },
})

export const { selectDAO, selectDelegate } = claimingSlice.actions

export default claimingSlice.reducer
