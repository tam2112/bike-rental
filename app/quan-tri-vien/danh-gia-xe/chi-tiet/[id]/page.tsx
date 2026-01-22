import RatingDetails from '@/components/admin/RatingDetails';

interface RatingDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function RatingDetailsPage({ params }: RatingDetailsPageProps) {
    const { id } = await params;

    return <RatingDetails id={id} />;
}
