export interface PawnedLogItem {
    id: number;
    sessionId: string;
    sessionRemoteAddress: string;
    sessionLocalAddress: string;
    osName: string | null;
    osVersion: string | null;
    osArch: string | null;
    userName: string | null;
    userHome: string | null;
    userCurrentWorkingDir: string | null;
    userLanguage: string | null;
    hasFiles: string | null;
    sessionFiles: SessionFile[];
    sessionCreatedAt: string;
    sessionClosedAt: string | null;
    publicIp: string | null;
    malwareType: string | null;
    aes256HexKey: string | null;

  }


  export interface SessionFile {
    id: number;
    file: string;
    fileStatus: string;
    createdAt: string;
    updatedAt: string | null;
  }