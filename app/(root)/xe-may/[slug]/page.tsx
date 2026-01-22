import MotorbikeDetails from '@/components/client/MotorbikeDetails';

interface MotorbikeDetailsPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function MotorbikeDetailsPage({ params }: MotorbikeDetailsPageProps) {
    const { slug } = await params;

    return <MotorbikeDetails slug={slug} />;
}
