import OrderDetails from '@/components/admin/OrderDetails';

interface OrderDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
    const { id } = await params;

    return <OrderDetails id={id} />;
}
