"use client";

import { useEffect, useState } from "react";
import { Card, Button, Tag, Typography, Empty } from "antd";
import { useRouter } from "next/navigation";
import { getRecruiterFeedbackSeasons } from "@/helpers/api";

import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface Season {
  id: string;
  year: string;
  type: string;
  status: string;
  feedbackSubmitted: boolean;
}

export default function RecruiterFeedbackPage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const data = await getRecruiterFeedbackSeasons();
        setSeasons(data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  if (!loading && seasons.length === 0) {
    return (
      <div className="p-6">
        <Empty description="No seasons available for feedback" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-6 p-4 md:p-10">
      <div>
        <Title level={3}>Season Feedback</Title>
        <Text type="secondary">
          Select a season to submit your feedback
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {seasons.map((season) => (
        <Card
          key={season.id}
          title={
              <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {season.feedbackSubmitted
                ? <CheckCircleOutlined style={{ color: "#1890ff" }} />
                : <InfoCircleOutlined style={{ color: "#1890ff" }} />}
              
              <Text strong style={{ fontSize: 16 }}>
                {season.year} {season.type}
              </Text>
            </div>
            <Tag color={season.status === "ACTIVE" ? "green" : "default"}>
              {season.status}
            </Tag>
          </div>
          }
          style={{
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            marginBottom: 16,
          }}
        >
          {/* Status + action */}
          <div>
            <Button
              type="primary"
              disabled={season.feedbackSubmitted}
              onClick={() =>
                router.push(`/recruiter/feedback/${season.id}`)
              }
            >
              {season.feedbackSubmitted
                ? "Feedback Submitted"
                : "Give Feedback"}
            </Button>
          </div>
        </Card>
        ))}
      </div>
    </div>
  );
}
