/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { Table, TableColumn, Progress } from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import useAsync from 'react-use/lib/useAsync';


type Environment = {
  service: string; 
  env: string; 
  version: string; 
  vip: string; 
  health: string; 
  deployedAt: string; 
  config: string; 
};

type DenseTableProps = {
  envs: Environment[];
};

export const DenseTable = ({ envs }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Service', field: 'service' },
    { title: 'Env', field: 'env' },
    { title: 'Version', field: 'version' },
    { title: 'Vip', field: 'vip' },
    { title: 'health', field: 'health' },
    { title: 'DeployedAt', field: 'deployedAt' },
    { title: 'Config', field: 'config' },
  ];

  const data = envs.map(env => {
    return {
      service: env.service,
      env: env.env,
      version: env.version,
      vip: env.vip,
      deployedAt: env.deployedAt,
      health: env.health,
      config: env.config,
    };
  });

  return (
    <Table
      title="Environment Details"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const ExampleFetchComponent = () => {
  const { value, loading, error } = useAsync(async (): Promise<Environment[]> => {
    const response = await fetch('http://localhost:9002/environment');
    const data = await response.json();
    return data;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.stack}</Alert>;
  }

  return <DenseTable envs={value || []} />;
};
