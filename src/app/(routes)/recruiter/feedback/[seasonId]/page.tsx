"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Result } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import RecruiterFeedbackForm from "@/components/RecruiterFeebackForm";

export default function RecruiterFeedbackSeasonPage() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const router = useRouter();

  if (!seasonId) {
    return (
      <Result
        status="error"
        title="Invalid Season"
        extra={
          <Button onClick={() => router.push("/recruiter/feedback")}>
            Go Back
          </Button>
        }
      />
    );
  }

  return (
    <div>
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.push("/recruiter/feedback")}
          style={{ marginBottom: "16px", paddingLeft: 0 }}
        >
          Go Back
        </Button>
        <RecruiterFeedbackForm seasonId={seasonId} />
    </div>
  );
}
