import MotorDetails from '@/components/admin/MotorDetails';

interface MotorDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MotorDetailsPage({ params }: MotorDetailsPageProps) {
    const { id } = await params;

    return <MotorDetails id={id} />;
}
