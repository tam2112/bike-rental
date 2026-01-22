import CustomerDetails from '@/components/admin/CustomerDetails';

interface CustomerDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CustomerDetailsPage({ params }: CustomerDetailsPageProps) {
    const { id } = await params;

    return <CustomerDetails id={id} />;
}
