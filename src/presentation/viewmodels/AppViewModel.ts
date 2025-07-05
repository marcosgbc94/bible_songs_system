import { useState } from "react";

type ProjectingState = {
  bible: boolean;
  hymnal: boolean;
};

type ActiveState = {
    bible: boolean;
    hymnal: boolean;
}

export function useAppViewModel() {
  const [projecting, setProjecting] = useState<ProjectingState>({
    bible: true,
    hymnal: true,
  });

  const [active, setActive] = useState<ActiveState>({
    bible: true,
    hymnal: false,
  });

  const setBibleProjection = (value: boolean) => {
    setProjecting(prev => ({ ...prev, bible: value }));
  };

  const setHymnalProjection = (value: boolean) => {
    setProjecting(prev => ({ ...prev, hymnal: value }));
  };

  const setBibleActive = (value: boolean) => {
    setActive(prev => ({ ...prev, bible: value, hymnal: (value && false) }));
  };

  const setHymnalActive = (value: boolean) => {
    setActive(prev => ({ ...prev, hymnal: value, bible: (value && false) }));
  };

  return {
    projecting,
    setBibleProjection,
    setHymnalProjection,
    active,
    setBibleActive,
    setHymnalActive,
  };
}
