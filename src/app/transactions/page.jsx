"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TransactionModal from "@/app//components/TransactionModal"; // Adjust the path as needed

export default function Transactions() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("transactionType", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.amount, {
      id: "amount",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Amount</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("description", {
      header: () => "Description",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: () => <span>Status</span>,
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (session) {
      setLoading(true);
      fetch("/api/transactions")
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data.transactions);
          setLoading(false);
        });
    }
  }, [session]);

  const handleNewTransaction = (newTransaction) => {
    // Here you would typically send a request to your API to save the new transaction
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">FinFlow</div>
          <div className="flex items-center space-x-4">
            {session && (
              <>
                {imageError ? (
                  <span className="text-white text-xs rounded-full font-bold border-4 border-white h-10 w-10 flex justify-center items-center">
                    {session.user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <img
                    src={session.user.image}
                    alt="user-avatar"
                    className="h-10 w-10 rounded-full border-2 border-white"
                    onError={() => setImageError(true)}
                  />
                )}
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  onClick={() => setIsModalOpen(true)} // Open modal on button click
                >
                  New Transaction
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-gray-100">
          Transaction History
        </h1>

        {/* Responsive Table */}
        <div className="overflow-x-auto shadow-xl rounded-lg backdrop-blur-md bg-white/60">
          <table className="table-auto min-w-full bg-transparent text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-xs font-bold text-white uppercase border-b-2 border-indigo-600"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading
                ? // Skeleton rows
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse bg-gray-200">
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      </td>
                    </tr>
                  ))
                : table.getRowModel()?.rows?.map((row) => (
                    <tr
                      key={row.id}
                      className="bg-white/60 border-b dark:bg-gray-800/60 dark:border-gray-700 hover:bg-gray-100/60 dark:hover:bg-gray-900/60"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Transaction Modal */}
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleNewTransaction}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} FinFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
