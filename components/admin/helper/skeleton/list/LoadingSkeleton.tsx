'use client';

import { motion } from 'framer-motion';

import CardSkeleton from './CardSkeleton';
import TableRowSkeleton from './TableRowSkeleton';

export default function LoadingSkeleton() {
    return (
        <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
        >
            <div className="lg:hidden space-y-4">
                {[1, 2, 3].map((i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
            <div className="hidden lg:block">
                <table className="w-full">
                    <tbody>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <TableRowSkeleton key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
