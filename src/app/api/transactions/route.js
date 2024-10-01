import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Transaction from "@/models/transactionModel";

connect();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to submit a transaction" },
        { status: 401 }
      );
    }

    const { transactionType, amount, description } = await req.json();

    const newTransaction = new Transaction({
      transactionType,
      amount,
      description,
      userEmail: session.user.email,
      status: "Pending",
    });

    const savedTransaction = await newTransaction.save();

    return NextResponse.json(
      {
        message: "Transaction submitted successfully",
        success: true,
        savedTransaction,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to view transactions" },
        { status: 401 }
      );
    }

    let transactions;

    // If the user is a Manager, return all transactions
    if (session.user.email === "koteswarraomudila@gmail.com") {
      transactions = await Transaction.find({});
    } else {
      // Otherwise, return only the user's own transactions
      transactions = await Transaction.find({ userEmail: session.user.email });
    }

    return NextResponse.json(
      { message: "Transactions retrieved successfully", transactions },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
